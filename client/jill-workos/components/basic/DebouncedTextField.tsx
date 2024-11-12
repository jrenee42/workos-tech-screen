import React, {useState, useEffect} from 'react';
import {TextField} from "@radix-ui/themes";

type Props = {
    onDebouncedChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    className?: string;
};

const DebouncedTextField: React.FC<Props> = ({ onDebouncedChange, icon, placeholder, className }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            onDebouncedChange(inputValue);
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, onDebouncedChange]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const iconPart = icon ? <TextField.Slot> {icon}</TextField.Slot> : null;

    return  (<TextField.Root placeholder={placeholder} className={className}
                            value={inputValue} onChange={handleChange} >
        {iconPart}
    </TextField.Root>);

};

export default DebouncedTextField;
