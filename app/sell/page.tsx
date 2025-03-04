/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Stepper, Step } from "@/components/ui/stepper";

const categories = [
  {
    name: "Electronics",
    subcategories: ["Phones", "Computers", "Tablets", "Accessories"],
  },
  {
    name: "Fashion",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Shoes",
      "Accessories",
    ],
  },
  // ... other categories
];

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [listingType, setListingType] = useState("free");
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState<any>([]);
  const router = useRouter();

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSubcategory("");
  };

  const handleSubcategoryChange = (value: string) => {
    setSubcategory(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting:", {
      category,
      subcategory,
      listingType,
      formData,
      images,
    });
    router.push("/"); // Redirect to homepage after submission
  };

  const renderCategoryStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.name} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {category && (
        <div>
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select value={subcategory} onValueChange={handleSubcategoryChange}>
            <SelectTrigger id="subcategory">
              <SelectValue placeholder="Select a subcategory" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .find((cat) => cat.name === category)
                ?.subcategories.map((subcat) => (
                  <SelectItem key={subcat} value={subcat}>
                    {subcat}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div>
        <Label htmlFor="listing-type">Listing Type</Label>
        <RadioGroup value={listingType} onValueChange={setListingType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free">Free Listing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paid" id="paid" />
            <Label htmlFor="paid">Paid Listing</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderDetailsStep = () => {
    const commonFields = (
      <>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="contact">Contact Information</Label>
          <Input
            id="contact"
            name="contact_phone"
            onChange={handleInputChange}
          />
        </div>
      </>
    );

    const phoneFields = (
      <>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" name="brand" onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input id="model" name="model" onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="condition">Condition</Label>
          <Select
            name="condition"
            onValueChange={(value) =>
              setFormData({ ...formData, condition: value })
            }
          >
            <SelectTrigger id="condition">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="like-new">Like New</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="for-parts">For Parts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </>
    );

    const shoeFields = (
      <>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" name="brand" onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="size">Size</Label>
          <Input id="size" name="size" onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input id="color" name="color" onChange={handleInputChange} />
        </div>
      </>
    );

    return (
      <div className="space-y-4">
        {commonFields}
        {subcategory === "Phones" && phoneFields}
        {subcategory === "Shoes" && shoeFields}
      </div>
    );
  };

  const renderImageStep = () => (
    <div className="space-y-4">
      <Label htmlFor="images">Upload Images</Label>
      <Input id="images" type="file" multiple onChange={handleImageUpload} />
      <div className="grid grid-cols-3 gap-4">
        {images.map((image: any, index: any) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Uploaded image ${index + 1}`}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment for Paid Listing</h3>
      <p>Please complete the payment to publish your listing.</p>
      {/* Add your payment integration here */}
      <Button onClick={() => setCurrentStep(currentStep + 1)}>
        Complete Payment
      </Button>
    </div>
  );

  const steps = [
    { title: "Category", content: renderCategoryStep() },
    { title: "Details", content: renderDetailsStep() },
    { title: "Images", content: renderImageStep() },
    ...(listingType === "paid"
      ? [{ title: "Payment", content: renderPaymentStep() }]
      : []),
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sell Your Item</h1>
      <Card>
        <CardHeader>
          <Stepper activeStep={currentStep} className="mb-8">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} />
            ))}
          </Stepper>
        </CardHeader>
        <CardContent>{steps[currentStep].content}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleSubmit();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
