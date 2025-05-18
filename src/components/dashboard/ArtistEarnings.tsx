
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Download, Calendar } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  LineChart, 
  PieChart, 
  Pie,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ArtistEarningsProps {
  isLoading: boolean;
}

// Sample data for charts
const monthlyData = [
  { name: "Jan", earnings: 12000 },
  { name: "Feb", earnings: 15000 },
  { name: "Mar", earnings: 18000 },
  { name: "Apr", earnings: 16000 },
  { name: "May", earnings: 21000 },
  { name: "Jun", earnings: 19000 },
  { name: "Jul", earnings: 22000 },
  { name: "Aug", earnings: 25000 },
  { name: "Sep", earnings: 27000 },
  { name: "Oct", earnings: 29000 },
  { name: "Nov", earnings: 31000 },
  { name: "Dec", earnings: 35000 },
];

const categoryData = [
  { name: "Images", value: 45000 },
  { name: "Audio", value: 28000 },
  { name: "Video", value: 18000 },
  { name: "Text", value: 9000 },
];

// Sample transaction data
const transactionData = [
  {
    id: "1",
    artworkTitle: "Mystic Mountains",
    artworkType: "image",
    amount: 4500,
    status: "completed",
    date: "2023-11-15T14:30:00",
    buyerName: "Rajiv Kumar"
  },
  {
    id: "2",
    artworkTitle: "Urban Dreams",
    artworkType: "video",
    amount: 6200,
    status: "completed",
    date: "2023-11-10T09:15:00",
    buyerName: "Priya Sharma"
  },
  {
    id: "3",
    artworkTitle: "Ambient Waves",
    artworkType: "audio",
    amount: 3800,
    status: "pending",
    date: "2023-11-18T16:45:00",
    buyerName: "Ankit Patel"
  },
  {
    id: "4",
    artworkTitle: "Whispers of Time",
    artworkType: "text",
    amount: 1500,
    status: "completed",
    date: "2023-11-05T11:20:00",
    buyerName: "Meera Joshi"
  },
  {
    id: "5",
    artworkTitle: "Digital Renaissance",
    artworkType: "image",
    amount: 8900,
    status: "completed",
    date: "2023-10-28T13:50:00",
    buyerName: "Vikram Singh"
  },
];

// Top performing artwork data
const topArtworksData = [
  {
    id: "1",
    title: "Mystic Mountains",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    earnings: 24500,
    sales: 12
  },
  {
    id: "2",
    title: "Ocean Dreams",
    thumbnail: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    earnings: 18700,
    sales: 9
  },
  {
    id: "3",
    title: "Urban Thoughts",
    thumbnail: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    earnings: 15200,
    sales: 7
  }
];

const ArtistEarnings = ({ isLoading }: ArtistEarningsProps) => {
  const [period, setPeriod] = useState("year");
  
  // Calculate total earnings
  const totalEarnings = transactionData.reduce(
    (sum, transaction) => sum + transaction.amount, 
    0
  );
  
  const pendingEarnings = transactionData
    .filter(transaction => transaction.status === "pending")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Earnings & Analytics</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>PDF Report</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>CSV Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime earnings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{pendingEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">To be processed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Per Sale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{Math.round(totalEarnings / transactionData.length).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">From {transactionData.length} sales</p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Revenue Over Time</CardTitle>
            <Tabs defaultValue="year" value={period} onValueChange={setPeriod}>
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#8b5cf6"
                  fill="url(#colorEarnings)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}`} />
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Earnings by Category</CardTitle>
            <CardDescription>Distribution of revenue across art types</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    nameKey="name"
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8b5cf6"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  />
                  <Tooltip formatter={(value) => `₹${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Artworks</CardTitle>
            <CardDescription>Your best selling pieces</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <ul className="space-y-4">
              {topArtworksData.map((artwork) => (
                <li key={artwork.id} className="flex items-center gap-3 px-6">
                  <div className="h-12 w-12 rounded overflow-hidden">
                    <img
                      src={artwork.thumbnail}
                      alt={artwork.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{artwork.title}</p>
                    <p className="text-xs text-muted-foreground">{artwork.sales} sales</p>
                  </div>
                  <p className="text-right font-semibold">₹{artwork.earnings.toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest earnings from artwork sales</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Artwork</th>
                  <th className="text-left p-4 font-medium">Buyer</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Amount</th>
                  <th className="text-left p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">{transaction.artworkTitle}</td>
                    <td className="p-4">{transaction.buyerName}</td>
                    <td className="p-4">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="p-4 font-medium">₹{transaction.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {transaction.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-center">
          <Button variant="outline" className="w-full md:w-auto">View All Transactions</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArtistEarnings;
