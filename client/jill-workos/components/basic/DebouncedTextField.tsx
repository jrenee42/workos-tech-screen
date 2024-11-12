import React, {useState, useRef} from 'react';
import {TextField} from "@radix-ui/themes";

type Props = {
    onDebouncedChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    className?: string;
    value: string;
};

const DebouncedTextField: React.FC<Props> = ({ onDebouncedChange, icon, placeholder, className, value }) => {
    const [inputValue, setInputValue] = useState(value);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

        // Clear any existing debounce timer
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set a new debounce timer
        debounceTimeout.current = setTimeout(() => {
            onDebouncedChange(event.target.value);
        }, 200);
    };

    const iconPart = icon ? <TextField.Slot> {icon}</TextField.Slot> : null;

    return  (<TextField.Root placeholder={placeholder} className={className}
                            value={inputValue} onChange={handleChange}
                             onKeyDown={() => {
                                 if (debounceTimeout.current) {
                                     clearTimeout(debounceTimeout.current); // Reset debounce if typing continues
                                 }
                             }}
    >
        {iconPart}
    </TextField.Root>);

};

export default DebouncedTextField;
