"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import type { options } from "../HeaderSearch"

type PersonDropdownMenuProps = {
    options: options;
    handleOptions: (key: keyof options, action: 'i' | 'd') => void;
};

export const PersonDropdownMenu: React.FC<PersonDropdownMenuProps> = ({ options, handleOptions }) => {
    return (
        <>
            <DropdownMenuItem className="flex justify-between items-center mb-1">
                <span className="optionText">Adults</span>
                <div className="optionCounter flex gap-[10px] items-center">
                    <Button
                        disabled={options.adult <= 1}
                        variant={"outline"}
                        className="optionCounterButton hover:bg-blue-700 hover:text-white"
                        onClick={() => handleOptions("adult", "d")}>-</Button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <Button
                        variant={"outline"}
                        className="optionCounterButton hover:bg-blue-700 hover:text-white"
                        onClick={() => handleOptions("adult", "i")}>+</Button>
                </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between items-center mb-1">
                <span className="optionText">Children</span>
                <div className="optionCounter flex gap-[10px] items-center">
                    <Button
                        disabled={options.children <= 0}
                        variant={"outline"}
                        className="optionCounterButton hover:bg-blue-700 hover:text-white"
                        onClick={() => handleOptions("children", "d")}>-</Button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <Button
                        variant={"outline"}
                        className="optionCounterButton hover:bg-blue-700 hover:text-white"
                        onClick={() => handleOptions("children", "i")}>+</Button>
                </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between items-center mb-1">
                <span className="optionText">Rooms </span>
                <div className="optionCounter flex gap-[10px] items-center">
                    <Button
                        disabled={options.rooms <= 1}
                        variant={"outline"}
                        className="optionCounterButton hover:bg-blue-700 hover:text-white"
                        onClick={() => handleOptions("adult", "d")}>-</Button>
                    <span className="optionCounterNumber">{options.rooms}</span>
                    <Button
                        variant={"outline"}
                        className="optionCounterButton hover:bg-blue-700 hover:text-white"
                        onClick={() => handleOptions("adult", "i")}>+</Button>
                </div>
            </DropdownMenuItem>
        </>
    )
}
