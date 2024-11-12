import { Text } from '@radix-ui/themes';
import { styled } from '@stitches/react';

const ErrorText = styled(Text, {
    color: 'red',
    fontSize: '13px',
    lineHeight: 1.5,
    fontWeight: 'bold',
    marginTop: '5px',
    // Add other styles as needed
});

export default function ErrorMessage({ message }: { message: string }) {
    return (
        <ErrorText role="alert" aria-live="assertive">
            {message}
        </ErrorText>
    );
}
