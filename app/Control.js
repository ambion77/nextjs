"use client";
import Link from 'next/link';
import { useParams , useRouter} from 'next/navigation';


export default function Control(){
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    return (
        <ul>
          <li><Link href="/create">create</Link></li>
          {id ? <>
            <li><Link href={"/update/"+id}>update</Link></li>
            <li><input type="button" value="delete" onClick={
                ()=>{
                    const options={
                        method:'DELETE'
                    }
                    fetch(`http://localhost:9999/topics/`+id,options)
                    .then(res=>res.json())
                    .then(data=>{
                        router.refresh();
                        router.push('/');
                    })
                }
            }></input></li>
            </> : null}
        </ul>
    )
}