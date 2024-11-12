'use client';
import styles from './userStyles.module.css';


type Props = {
    url: string;
    name: string;
};

export default function UserPhoto({url, name}:Props){
    return (<div className={styles.nameBox}>
        <img src={url} className={styles.circularImage}/>
        {name}
    </div>);
};