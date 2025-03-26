"use client";
import {useParams, useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';

export  default function Update(){
    const[titles,setTitles] = useState([]);
    const [description,setDescription] = useState([]);

    const router = useRouter();
    const params = useParams();
    const id = params.id;

    useEffect(()=>{
        console.log('update page');
        fetch(`http://localhost:9999/topics/`+id)
        .then(res=>res.json())  
        .then(data=>{
            console.log(data);
            setTitles(data.title);
            setDescription(data.description);
        });
    },[]);
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title = e.target.title.value;
            const description = e.target.description.value;
            const options={
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title,description})
            }
            fetch('http://localhost:9999/topics/'+id,options)
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                const lastid = data.id;
                router.refresh();
                router.push(`/read/${lastid}`);
            })  
        }}>
            <p>
                <input type="text" name="title" placeholder="Title" value={titles} onChange={(e)=>setTitles(e.target.value)}></input>
            </p>
            <p>
                <textarea name="description" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            </p>
            <p>
                <input type="submit" value="update"></input>
            </p>            
        </form>
    )
}