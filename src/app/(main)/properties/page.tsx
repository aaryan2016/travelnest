/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import type { Property } from '@prisma/client'
import { PropertyForm } from '@/components/PropertyForm'
import { Button } from '@/components/ui/button'
import { createOrUpdateProperty, deleteProperty, fetchAllProperties } from '@/app/actions'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'

const PAGE_SIZE = 5 // Number of properties per page

export default function PropertyPage() {
    const [properties, setProperties] = useState<Property[]>([])
    const [editingProperty, setEditingProperty] = useState<Property | null>(null)
    // const [isCreating, setIsCreating] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null)
    const [searchQuery, setSearchQuery] = useState('') // State for search input
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    // Fetch all properties from the database
    useEffect(() => {
        const fetchData = async () => {
            const { properties: data, count } = await fetchAllProperties(currentPage, PAGE_SIZE, searchQuery)
            setProperties(data)
            setTotalCount(count)
        }

        void fetchData()
    }, [currentPage, searchQuery])

    //Handle Admin access
    const { data: session, status } = useSession()

    if (status === 'loading') return <div>Loading...</div>

    if (!session || session.user.role !== 'ADMIN') {
        return <div className="text-red-500 p-6 text-center">Access Denied: Admins Only</div>
    }

    // Handle search query change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    // Filter properties based on search query
    const filteredProperties = properties.filter((property) => {
        return (
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.city.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    const handleCreateClick = () => {
        // setIsCreating(true)
        setEditingProperty(null) // Clear out existing property if in create mode
        setDialogOpen(true) // Open the dialog for property creation
    }

    const handleEditClick = (property: Property) => {
        setEditingProperty(property)
        // setIsCreating(false) // Not in create mode
        setDialogOpen(true) // Open the dialog for editing
    }

    const handleDelete = async () => {
        if (propertyToDelete) {
            // Call the delete action
            await deleteProperty(propertyToDelete.id)

            // After deletion, fetch the properties again
            const { properties: newProperties, count } = await fetchAllProperties(currentPage, PAGE_SIZE, searchQuery);
            setProperties(newProperties); // Set the updated properties
            setTotalCount(count); // Update count for pagination

            // Close the delete confirmation dialog
            setDeleteDialogOpen(false)

            // Set success message
            setSuccessMessage('Property deleted successfully!')

            // Clear success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000)
        }
    }

    // Server Action to create or update property
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const handleSubmit = async (data: any) => {
        const editingPropertyId = editingProperty?.id

        // Call the server action to either create or update the property
        await createOrUpdateProperty(data, editingPropertyId)

        // After submission, fetch the properties again to reflect the changes
        const { properties: newProperties, count } = await fetchAllProperties(currentPage, PAGE_SIZE);
        setProperties(newProperties); // Set the updated properties
        setTotalCount(count); // Update count for pagination

        // Close the dialog after successful submission
        setDialogOpen(false)

        // Set success message
        setSuccessMessage(editingProperty ? 'Property updated successfully!' : 'Property created successfully!')

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('')
        }, 5000)
    }

    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <div className="listContainer flex justify-center mt-5">
            <div className="listWrapper w-full max-w-screen-lg flex gap-5">
                <div className="p-4">
                    {/* Search Bar */}
                    <div className="mb-4">
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search properties or city..."
                            className="border p-2 rounded-md w-full"
                        />
                    </div>
                    {/* Create New Property - Dialog for creation */}
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={handleCreateClick}>Create New Property</Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogTitle>{editingProperty ? 'Edit Property' : 'Create New Property'}</DialogTitle>
                            <DialogDescription>
                                {editingProperty ? 'Modify the details of the property.' : 'Enter the details for the new property.'}
                            </DialogDescription>

                            <PropertyForm
                                property={editingProperty}
                                onSubmit={handleSubmit}
                            />
                        </DialogContent>
                    </Dialog>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mt-4 text-green-500 bg-green-100 p-2 rounded-md">
                            {successMessage}
                        </div>
                    )}

                    {/* Properties List */}
                    <div className="mt-6">
                        {filteredProperties.length === 0 ? (
                            <p>No properties found matching your search.</p>
                        ) : (
                            filteredProperties.map((property) => (
                                <div key={property.id} className="border p-4 mb-4 rounded-md">
                                    <h3 className="font-bold text-xl">{property.title}</h3>
                                    <p>{property.description}</p>
                                    <p><strong>City:</strong> {property.city}</p>
                                    <p><strong>Country:</strong> {property.country}</p>

                                    {/* Edit and Delete Buttons */}
                                    <div className="flex gap-2 mt-4">
                                        <Button onClick={() => handleEditClick(property)}>
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={
                                                () => {
                                                    setPropertyToDelete(property);
                                                    setDeleteDialogOpen(true);
                                                }
                                            }
                                            className="bg-red-500 text-white">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}


                        {/* {properties.map((property) => (
                            <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all">
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{property.description}</p>
                                    <div className="mt-3 flex items-center text-sm text-gray-500">
                                        <span>{property.city}, {property.country}</span>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <span>{property.propertyType}</span>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <span>Created: {new Date(property.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <div className="mt-4 flex space-x-4"> */}
                        {/* Edit Button - Opens Dialog with the selected property */}
                        {/* <Button
                                            onClick={() => handleEditClick(property)}
                                            className="text-white w-auto rounded-md"
                                        >
                                            Edit
                                        </Button> */}

                        {/* Delete Button - Opens confirmation Dialog*/}
                        {/* <Button
                                            onClick={() => {
                                                setPropertyToDelete(property);
                                                setDeleteDialogOpen(true);
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white w-auto rounded-md"
                                        >Delete
                                        </Button> */}
                        {/* </div>
                                </div>
                            </div>
                        ))} */}
                    </div>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <DialogContent>
                            <DialogTitle>Delete Property</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this property? This action cannot be undone.
                            </DialogDescription>
                            <div className="mt-4 flex justify-end space-x-4">
                                <Button
                                    onClick={() => {
                                        setDeleteDialogOpen(false)
                                        setPropertyToDelete(null)
                                    }}
                                    className="bg-gray-300 text-gray-800 hover:bg-gray-800 hover:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Delete
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-6">
                        <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <div className="text-center">
                            Page {currentPage} of {totalPages}
                        </div>
                        <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
