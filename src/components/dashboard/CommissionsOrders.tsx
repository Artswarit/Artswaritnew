
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Clock, DollarSign, User, MessageCircle, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: string;
  payment_status: string;
  client_profile: {
    full_name: string;
    avatar_url?: string;
  };
  created_at: string;
}

const CommissionsOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      // Get artist profile first
      const { data: artistProfile } = await supabase
        .from('artist_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!artistProfile) return;

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          client_profile:profiles!orders_client_id_fkey(
            full_name,
            avatar_url
          )
        `)
        .eq('artist_id', artistProfile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
      
      toast.success(`Order ${status}`);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{order.title}</h3>
            <p className="text-gray-600 mb-3">{order.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {order.client_profile.full_name}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                ₹{order.budget?.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(order.deadline).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <Badge className={getStatusColor(order.status)}>
            {order.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="flex gap-2">
          {order.status === 'pending' && (
            <>
              <Button 
                size="sm" 
                onClick={() => updateOrderStatus(order.id, 'accepted')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-1" />
                Accept
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => updateOrderStatus(order.id, 'cancelled')}
              >
                <X className="h-4 w-4 mr-1" />
                Decline
              </Button>
            </>
          )}
          
          {order.status === 'accepted' && (
            <Button 
              size="sm"
              onClick={() => updateOrderStatus(order.id, 'in_progress')}
            >
              Start Work
            </Button>
          )}
          
          {order.status === 'in_progress' && (
            <Button 
              size="sm"
              onClick={() => updateOrderStatus(order.id, 'completed')}
              className="bg-green-600 hover:bg-green-700"
            >
              Mark Complete
            </Button>
          )}
          
          <Button size="sm" variant="outline">
            <MessageCircle className="h-4 w-4 mr-1" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Commissions & Orders</h2>
        <div className="flex gap-2">
          <Badge variant="outline">{orders.length} Total Orders</Badge>
          <Badge className="bg-yellow-100 text-yellow-800">
            {filterOrdersByStatus('pending').length} Pending
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterOrdersByStatus('pending').length})</TabsTrigger>
          <TabsTrigger value="active">Active ({filterOrdersByStatus('accepted').length + filterOrdersByStatus('in_progress').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filterOrdersByStatus('completed').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">No orders yet. Start promoting your services to get commissions!</p>
              </CardContent>
            </Card>
          ) : (
            orders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {filterOrdersByStatus('pending').map(order => <OrderCard key={order.id} order={order} />)}
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          {[...filterOrdersByStatus('accepted'), ...filterOrdersByStatus('in_progress')]
            .map(order => <OrderCard key={order.id} order={order} />)}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {filterOrdersByStatus('completed').map(order => <OrderCard key={order.id} order={order} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionsOrders;
