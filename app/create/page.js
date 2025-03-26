"use client";
import {useRouter} from 'next/navigation';

export  default function Create(){
    const router = useRouter();
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title = e.target.title.value;
            const description = e.target.description.value;
            const options={
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title,description})
            }
            fetch('http://localhost:9999/topics',options)
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                const lastid = data.id;
                router.refresh();
                router.push(`/read/${lastid}`);
            })  
        }}>
            <p>
                <input type="text" name="title" placeholder="Title" required></input>
            </p>
            <p>
                <textarea name="description" placeholder="Description" required></textarea>
            </p>
            <p>
                <input type="submit" value="create"></input>
            </p>            
        </form>
    )
}