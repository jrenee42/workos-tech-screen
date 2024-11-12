// components/LoadingSpinner.js
import { styled, keyframes } from '@stitches/react';
import { MixerHorizontalIcon } from '@radix-ui/react-icons'; // Using this icon as a spinner

// Define a keyframes animation for rotation
const rotate = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

// Style the icon with rotation animation
const RotatingIcon = styled(MixerHorizontalIcon, {
    animation: `${rotate} 1s linear infinite`, // 1s for rotation speed, adjust as needed
    width: '24px', // Size of the spinner
    height: '24px',
});

export function LoadingSpinner() {
    return <RotatingIcon />;
}
