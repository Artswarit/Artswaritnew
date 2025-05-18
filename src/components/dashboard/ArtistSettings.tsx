
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  User, Shield, Bell, CreditCard, Lock, 
  Mail, Smartphone, LogOut 
} from "lucide-react";

interface ArtistSettingsProps {
  isLoading: boolean;
}

const ArtistSettings = ({ isLoading }: ArtistSettingsProps) => {
  const [activeTab, setActiveTab] = useState("account");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    paymentAlerts: true,
    commentNotifications: true,
    marketingEmails: false,
    smsNotifications: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    showActivity: true
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSecurityToggle = (key: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const updatePassword = () => {
    console.log("Password update:", passwordData);
    // Reset form after submission
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Account Settings</h2>
      </div>

      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap md:justify-start">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Settings
                </CardTitle>
                <CardDescription>
                  Manage your email address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-email">Current Email</Label>
                  <Input 
                    id="current-email" 
                    value="ananya.sharma@example.com" 
                    disabled 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-email">New Email</Label>
                  <Input 
                    id="new-email" 
                    placeholder="Enter new email address" 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Email</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Manage your contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+91 XXXXXXXXXX" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    placeholder="Your city" 
                    defaultValue="Mumbai"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="IN"
                  >
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Contact Info</Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogOut className="h-5 w-5 text-red-500" />
                  Account Actions
                </CardTitle>
                <CardDescription>
                  Manage your account status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Deactivate Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Temporarily deactivate your account. You can reactivate at any time.
                  </p>
                  <Button variant="outline" className="text-amber-600 border-amber-600">
                    Deactivate Account
                  </Button>
                </div>
                
                <div className="pt-4 border-t space-y-2">
                  <h3 className="font-semibold text-red-500">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Password
                </CardTitle>
                <CardDescription>
                  Change your password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password"
                    name="currentPassword"
                    type="password" 
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    name="newPassword"
                    type="password" 
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    name="confirmPassword"
                    type="password" 
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={updatePassword}>Update Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={() => handleSecurityToggle("twoFactorEnabled")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="login-alerts">Login Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive alerts for new logins to your account
                    </p>
                  </div>
                  <Switch
                    id="login-alerts"
                    checked={securitySettings.loginAlerts}
                    onCheckedChange={() => handleSecurityToggle("loginAlerts")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-activity">Activity Visibility</Label>
                    <p className="text-xs text-muted-foreground">
                      Show your active status to other users
                    </p>
                  </div>
                  <Switch
                    id="show-activity"
                    checked={securitySettings.showActivity}
                    onCheckedChange={() => handleSecurityToggle("showActivity")}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Security Settings</Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Login Sessions
                </CardTitle>
                <CardDescription>
                  Manage devices logged into your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h4 className="font-medium">Chrome on Windows</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Mumbai, India • Current Session</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Current
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h4 className="font-medium">Safari on iPhone</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Mumbai, India • Last active 2 days ago</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      Sign Out
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Chrome on Macbook</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Delhi, India • Last active 5 days ago</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-red-500">Sign out of all devices</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">All Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Master control for all email notifications
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="payment-alerts">Payment Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive emails about payments and transactions
                    </p>
                  </div>
                  <Switch
                    id="payment-alerts"
                    checked={notificationSettings.paymentAlerts}
                    disabled={!notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("paymentAlerts")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comment-notifications">Comment Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive emails when someone comments on your artwork
                    </p>
                  </div>
                  <Switch
                    id="comment-notifications"
                    checked={notificationSettings.commentNotifications}
                    disabled={!notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("commentNotifications")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-xs text-muted-foreground">
                      Promotional emails and platform updates
                    </p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={notificationSettings.marketingEmails}
                    disabled={!notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">SMS Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive important alerts via SMS
                    </p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={() => handleNotificationToggle("smsNotifications")}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Manage how you receive payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">HDFC Bank</p>
                        <p className="text-xs text-muted-foreground">XXXX-XXXX-XXXX-1234</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Primary
                    </span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5 5C14.5 3 13 2 13 2H2.5V22H4.5V14H10.5L13 22H15L12.5 14C14.5 14 16.5 12 16.5 10V7.5C16.5 7.5 16.5 7 14.5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21.6935 15C21.496 15 21.3097 14.9611 21.1347 14.883L16.8227 13.0986C16.3198 12.8848 16.031 12.3662 16.0435 11.8136L16.3026 5.03223C16.3026 4.46808 16.7639 4 17.326 4C17.5235 4 17.7097 4.03889 17.8847 4.11697L22.1968 5.90141C22.6997 6.11525 22.9884 6.63384 22.9759 7.1864L22.7169 13.9678C22.7169 14.5319 22.2555 15 21.6935 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">UPI</p>
                        <p className="text-xs text-muted-foreground">ananya@upi</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Make Primary
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Add New Payment Method
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payout Settings
                </CardTitle>
                <CardDescription>
                  Configure your payout schedule and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payout-frequency">Payout Frequency</Label>
                  <select
                    id="payout-frequency"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="monthly"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    How often you want to receive payouts for your earnings
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="min-payout">Minimum Payout Amount (₹)</Label>
                  <Input 
                    id="min-payout" 
                    type="number"
                    defaultValue="1000" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Earnings must reach this threshold for payout
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-payout">Automatic Payouts</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically process payouts when threshold is met
                    </p>
                  </div>
                  <Switch
                    id="auto-payout"
                    defaultChecked={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Payout Settings</Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Tax Information
                </CardTitle>
                <CardDescription>
                  Manage your tax and payment information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pan-number">PAN Number</Label>
                    <Input 
                      id="pan-number" 
                      placeholder="ABCDE1234F"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gst-number">GST Number (Optional)</Label>
                    <Input 
                      id="gst-number" 
                      placeholder="22AAAAA0000A1Z5"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-residence">Tax Residence</Label>
                    <select
                      id="tax-residence"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="IN"
                    >
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-status">Tax Filing Status</Label>
                    <select
                      id="tax-status"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="individual"
                    >
                      <option value="individual">Individual</option>
                      <option value="business">Business</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Tax Information</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistSettings;
