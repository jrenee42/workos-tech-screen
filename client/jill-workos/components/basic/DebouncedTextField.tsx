import React, { useState, useEffect } from 'react';

type Props = {
    onDebouncedChange: (value: string) => void;
};

const DebouncedTextField: React.FC<Props> = ({ onDebouncedChange }) => {
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

    return <input type="text" value={inputValue} onChange={handleChange} />;
};

export default DebouncedTextField;
