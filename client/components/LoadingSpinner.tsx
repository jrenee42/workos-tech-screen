// components/LoadingSpinner.js
import { styled, keyframes } from '@stitches/react';
import { LoopIcon } from '@radix-ui/react-icons';

// Define the rotation animation
const rotate = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

// Style the icon with rotation animation
const RotatingIcon = styled(LoopIcon, {
    animation: `${rotate} 1s linear infinite`, // Adjust speed as needed
    width: '50px', // Size of the spinner
    height: '50px',
});

export function LoadingSpinner() {
    return <RotatingIcon />;
}
