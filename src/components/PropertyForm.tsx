/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
// components/PropertyForm.tsx
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { PropertyType } from '@prisma/client'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'

interface PropertyFormProps {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    property: any | null
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onSubmit: (data: any) => void
}

export const PropertyForm = ({ property, onSubmit }: PropertyFormProps) => {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: '',
            description: '',
            propertyType: PropertyType.HOTEL,
            address: '',
            city: '',
            country: '',
        }
    })

    // Populate form with existing property data when editing
    useEffect(() => {
        if (property) {
            setValue('title', property.title)
            setValue('description', property.description)
            setValue('propertyType', property.propertyType)
            setValue('address', property.address)
            setValue('city', property.city)
            setValue('country', property.country)
        }
    }, [property, setValue])

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const onSubmitHandler = (data: any) => {
        // Pass the form data to parent component's submit handler
        data.createdById = "cm5cpdv7v0000ytatei74xszu";
        onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
            {/* Title */}
            <div className="flex flex-col">
                <label htmlFor="title" className="font-semibold text-sm mb-2">
                    Title
                </label>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="title"
                            {...field}
                            placeholder="Enter Property Title"
                        />
                    )}
                />
            </div>

            {/* Description */}
            <div className="flex flex-col">
                <label htmlFor="description" className="font-semibold text-sm mb-2">
                    Description
                </label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            id="description"
                            {...field}
                            placeholder="Enter Property Description"
                        />
                    )}
                />
            </div>

            {/* Address */}
            <div className="flex flex-col">
                <label htmlFor="address" className="font-semibold text-sm mb-2">
                    Address
                </label>
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="address"
                            {...field}
                            placeholder="Enter Property Address"
                        />
                    )}
                />
            </div>

            {/* City */}
            <div className="flex flex-col">
                <label htmlFor="city" className="font-semibold text-sm mb-2">
                    City
                </label>
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="city"
                            {...field}
                            placeholder="Enter City"
                        />
                    )}
                />
            </div>

            {/* Country */}
            <div className="flex flex-col">
                <label htmlFor="country" className="font-semibold text-sm mb-2">
                    Country
                </label>
                <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="country"
                            {...field}
                            placeholder="Enter Country"
                        />
                    )}
                />
            </div>

            {/* Property Type */}
            <div className="flex flex-col">
                <label htmlFor="propertyType" className="font-semibold text-sm mb-2">
                    Property Type
                </label>
                <Controller
                    name="propertyType"
                    control={control}
                    render={({ field }) => (
                        <Select {...field}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Property Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(PropertyType).map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-4">
                {property ? 'Update Property' : 'Create Property'}
            </Button>
        </form>
    )
}
