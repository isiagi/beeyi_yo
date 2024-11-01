/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  MessageSquare,
  Package,
  Settings,
  Star,
  // Eye,
} from "lucide-react";
import { axiosInstance } from "@/lib/base";

export default function UserProfile() {
  const [user, setUser] = useState<any>({
    name: "Alice Johnson",
    username: "alice_j",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2023",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Passionate about vintage collectibles and rare finds.",
    location: "New York, NY",
    stats: {
      listings: 23,
      rating: 4.8,
      reviews: 47,
    },
    recentListings: [
      {
        id: 1,
        title: "Vintage Camera",
        category: "Electronics",
        views: 152,
        date: "2 days ago",
      },
      {
        id: 2,
        title: "Antique Watch",
        category: "Jewelry",
        views: 89,
        date: "5 days ago",
      },
      {
        id: 3,
        title: "Rare Book Collection",
        category: "Books",
        views: 201,
        date: "1 week ago",
      },
    ],
  });

  const [testUser, setTestUser] = useState<any>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/2");

        setTestUser(response.data);

        console.log(response.data, "json");
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [user]);

  const [editedUser, setEditedUser] = useState({
    ...user,
    password: "",
    confirmPassword: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev: any) => ({ ...prev, [name]: value }));
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedUser.password !== editedUser.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    // Here you would typically send the updated user data to your backend
    setUser({
      ...editedUser,
      // Don't update the password in the user state, as it should be handled separately on the backend
      password: undefined,
      confirmPassword: undefined,
    });
    setIsEditModalOpen(false);
    try {
      const response = await axiosInstance.patch(`/auth/2`, editedUser);

      console.log(response.data, "jsonzzzz");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full  mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl">{`${testUser?.first_name} ${testUser?.last_name}`}</CardTitle>
              <CardDescription>@{testUser?.username}</CardDescription>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span className="text-sm text-muted-foreground">
                  Joined {user.joinDate}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{user.bio}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {user.location}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Listings
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.listings}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.rating}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.reviews}</div>
              </CardContent>
            </Card>
          </div>

          {/* <Tabs defaultValue="listings" className="w-full">
            <TabsList>
              <TabsTrigger value="listings">Recent Listings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="listings">
              <div className="space-y-4">
                {user.recentListings.map((listing: any) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{listing.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {listing.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>{listing.views}</span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {listing.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <p className="text-muted-foreground">
                Reviews will be displayed here.
              </p>
            </TabsContent>
          </Tabs> */}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Package className="mr-2 h-4 w-4" /> My Listings
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <MessageSquare className="mr-2 h-4 w-4" /> Messages
            </Button>
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Settings className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] overflow-y-scroll max-h-screen">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={editedUser.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={editedUser.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={editedUser.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter new password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      onChange={handleInputChange}
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
