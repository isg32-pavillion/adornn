import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Package, RotateCcw, RefreshCw } from "lucide-react";

const Returns = () => {
  const { toast } = useToast();
  const [requestType, setRequestType] = useState<"return" | "exchange">("return");
  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
    itemName: "",
    reason: "",
    condition: "",
    description: "",
    exchangeItem: "",
    refundMethod: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: `${requestType === 'return' ? 'Return' : 'Exchange'} request submitted!`,
      description: "We'll review your request and email you a return label within 24 hours.",
    });
    
    // Reset form
    setFormData({
      orderNumber: "",
      email: "",
      itemName: "",
      reason: "",
      condition: "",
      description: "",
      exchangeItem: "",
      refundMethod: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Returns & Exchanges</h1>
          <p className="text-xl text-muted-foreground">
            Not completely satisfied? We'll help you return or exchange your item.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Process Overview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Return Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <span className="text-primary font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Submit Request</p>
                    <p className="text-sm text-muted-foreground">Fill out the return form</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <span className="text-primary font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Get Label</p>
                    <p className="text-sm text-muted-foreground">Receive prepaid return label via email</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <span className="text-primary font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Ship Back</p>
                    <p className="text-sm text-muted-foreground">Package and ship your item</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <span className="text-primary font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Get Refund</p>
                    <p className="text-sm text-muted-foreground">Refund processed in 5-7 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-foreground mb-2">Return Policy</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 7-day return window</li>
                  <li>• Products must be unopened/unused</li>
                  <li>• Original packaging required</li>
                  <li>• Contact us via WhatsApp or Email</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Request Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Return/Exchange Request</span>
                  <div className="flex space-x-2">
                    <Button
                      variant={requestType === "return" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRequestType("return")}
                      className="flex items-center space-x-1"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Return</span>
                    </Button>
                    <Button
                      variant={requestType === "exchange" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRequestType("exchange")}
                      className="flex items-center space-x-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Exchange</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Order Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderNumber">Order Number *</Label>
                      <Input
                        id="orderNumber"
                        placeholder="e.g. AH12345678"
                        value={formData.orderNumber}
                        onChange={(e) => handleChange("orderNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name *</Label>
                    <Input
                      id="itemName"
                      placeholder="e.g. Herbaura Herbal Shampoo 300ml"
                      value={formData.itemName}
                      onChange={(e) => handleChange("itemName", e.target.value)}
                      required
                    />
                  </div>

                  {/* Return/Exchange Reason */}
                  <div className="space-y-2">
                    <Label htmlFor="reason">
                      {requestType === "return" ? "Reason for Return" : "Reason for Exchange"} *
                    </Label>
                    <Select value={formData.reason} onValueChange={(value) => handleChange("reason", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wrong-size">Wrong size</SelectItem>
                        <SelectItem value="wrong-color">Wrong color</SelectItem>
                        <SelectItem value="damaged">Arrived damaged</SelectItem>
                        <SelectItem value="defective">Defective item</SelectItem>
                        <SelectItem value="not-as-described">Not as described</SelectItem>
                        <SelectItem value="changed-mind">Changed my mind</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Item Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New - never used</SelectItem>
                        <SelectItem value="like-new">Like new - minimal use</SelectItem>
                        <SelectItem value="good">Good - some wear</SelectItem>
                        <SelectItem value="damaged">Damaged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {requestType === "exchange" && (
                    <div className="space-y-2">
                      <Label htmlFor="exchangeItem">What would you like instead? *</Label>
                      <Input
                        id="exchangeItem"
                        placeholder="e.g. Same item in different color/size"
                        value={formData.exchangeItem}
                        onChange={(e) => handleChange("exchangeItem", e.target.value)}
                        required={requestType === "exchange"}
                      />
                    </div>
                  )}

                  {requestType === "return" && (
                    <div className="space-y-2">
                      <Label htmlFor="refundMethod">Preferred Refund Method</Label>
                      <Select value={formData.refundMethod} onValueChange={(value) => handleChange("refundMethod", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select refund method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="original">Original payment method</SelectItem>
                          <SelectItem value="store-credit">Store credit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      placeholder="Please provide any additional details about your return/exchange request..."
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                      I confirm that this item is in its original condition with all tags attached, 
                      and I agree to the return/exchange terms and conditions.
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Package className="h-4 w-4 mr-2" />
                    Submit {requestType === "return" ? "Return" : "Exchange"} Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;