
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { 
  ChevronLeft,
  Calendar,
  Package2,
  Clock,
  CheckCircle,
  Truck,
  ShoppingCart
} from "lucide-react";
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { orderHistory } from "@/lib/orderHistory";

const OrderHistory = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredOrders = filter 
    ? orderHistory.filter(order => order.status === filter)
    : orderHistory;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 mr-2 text-green-500" />;
      case 'in-transit':
        return <Truck className="h-5 w-5 mr-2 text-recipe-500" />;
      case 'preparing':
        return <Package2 className="h-5 w-5 mr-2 text-amber-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-2">
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold">Order History</h1>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={filter === null ? "default" : "outline"} 
            onClick={() => setFilter(null)}
            className="flex items-center"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            All Orders
          </Button>
          <Button 
            variant={filter === "preparing" ? "default" : "outline"} 
            onClick={() => setFilter("preparing")}
            className="flex items-center"
          >
            <Package2 className="h-4 w-4 mr-2" />
            Preparing
          </Button>
          <Button 
            variant={filter === "in-transit" ? "default" : "outline"} 
            onClick={() => setFilter("in-transit")}
            className="flex items-center"
          >
            <Truck className="h-4 w-4 mr-2" />
            In Transit
          </Button>
          <Button 
            variant={filter === "delivered" ? "default" : "outline"} 
            onClick={() => setFilter("delivered")}
            className="flex items-center"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Delivered
          </Button>
        </div>
        
        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {formatDate(order.orderDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <Badge className={`
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                        ${order.status === 'in-transit' ? 'bg-recipe-100 text-recipe-800' : ''}
                        ${order.status === 'preparing' ? 'bg-amber-100 text-amber-800' : ''}
                      `}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">
                    Order #{order.id.slice(0, 8)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="font-medium text-sm mb-2">Order Items</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                        <div>
                          <Link to={`/recipe/${item.recipeId}`} className="font-medium hover:text-recipe-600">
                            {item.recipeName}
                          </Link>
                          <div className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="text-recipe-600">₹{item.price}</div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span>
                      {order.status === 'delivered' ? 'Delivered' : 
                       order.status === 'in-transit' ? 'Expected delivery soon' :
                       'Being prepared'}
                    </span>
                  </div>
                  <div className="font-bold text-recipe-700">
                    Total: ₹{order.totalAmount}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400" />
            <h2 className="mt-4 text-xl font-medium text-gray-700">No orders found</h2>
            <p className="mt-2 text-gray-500">You haven't placed any orders yet.</p>
            <Button className="mt-4" asChild>
              <Link to="/">Browse Recipes</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
