'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, PlusCircle, DollarSign, User, Phone, Mail } from 'lucide-react'

type Item = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

type Owner = {
  name: string;
  phone: string;
  email: string;
}

const initialItems: Item[] = [
  { id: 1, name: 'Vintage Camera', price: 150, description: 'A beautiful vintage camera in excellent condition.', imageUrl: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Mountain Bike', price: 300, description: 'High-quality mountain bike, perfect for trails.', imageUrl: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Leather Jacket', price: 80, description: 'Classic leather jacket, size M, barely worn.', imageUrl: '/placeholder.svg?height=200&width=200' },
]

const owner: Owner = {
  name: 'John Doe',
  phone: '+1 (555) 123-4567',
  email: 'john.doe@example.com'
}

export function Page() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({ name: '', price: 0, description: '', imageUrl: '/placeholder.svg?height=200&width=200' })

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id))
    setIsDeleteDialogOpen(false)
  }

  const handleEdit = (item: Item) => {
    setEditingItem({ ...item })
  }

  const handleSave = (editedItem: Item) => {
    setItems(items.map(item => item.id === editedItem.id ? editedItem : item))
    setEditingItem(null)
  }

  const handleAdd = () => {
    const id = Math.max(...items.map(item => item.id), 0) + 1
    setItems([...items, { ...newItem, id }])
    setNewItem({ name: '', price: 0, description: '', imageUrl: '/placeholder.svg?height=200&width=200' })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Shop</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>My Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {items.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/3">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="w-full h-auto object-cover rounded-md"
                          />
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-gray-600">{item.description}</p>
                            <p className="text-lg font-semibold mt-2 flex items-center">
                              <DollarSign className="h-5 w-5 mr-1" />
                              {item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Item</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingItem?.name}
                                      onChange={(e) => setEditingItem({...editingItem!, name: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-price" className="text-right">Price</Label>
                                    <Input
                                      id="edit-price"
                                      type="number"
                                      value={editingItem?.price}
                                      onChange={(e) => setEditingItem({...editingItem!, price: parseFloat(e.target.value)})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-description" className="text-right">Description</Label>
                                    <Textarea
                                      id="edit-description"
                                      value={editingItem?.description}
                                      onChange={(e) => setEditingItem({...editingItem!, description: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-image" className="text-right">Image URL</Label>
                                    <Input
                                      id="edit-image"
                                      value={editingItem?.imageUrl}
                                      onChange={(e) => setEditingItem({...editingItem!, imageUrl: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={() => handleSave(editingItem!)}>Save changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                              <DialogTrigger asChild>
                                <Button variant="destructive" size="sm" onClick={() => setItemToDelete(item)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirm Deletion</DialogTitle>
                                </DialogHeader>
                                <p>Are you sure you want to delete &quot;{itemToDelete?.name}&quot;? This action cannot be undone.</p>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                                  <Button variant="destructive" onClick={() => handleDelete(itemToDelete!.id)}>Delete</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-name" className="text-right">Name</Label>
                      <Input
                        id="new-name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-price" className="text-right">Price</Label>
                      <Input
                        id="new-price"
                        type="number"
                        value={newItem.price}
                        onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-description" className="text-right">Description</Label>
                      <Textarea
                        id="new-description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-image" className="text-right">Image URL</Label>
                      <Input
                        id="new-image"
                        value={newItem.imageUrl}
                        onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAdd}>Add Item</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Owner Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>{owner.name}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>{owner.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>{owner.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}