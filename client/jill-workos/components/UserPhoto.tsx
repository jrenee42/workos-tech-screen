'use client';

type Props = {
    url: string;
};

export default function UserPhoto({url}:Props){
    return <img src={url}/>;
};