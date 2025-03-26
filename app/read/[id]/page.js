export  default async function Read(props){
    const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`,{cache: 'no-store'});   
    const pagetopic = await resp.json();
    console.log(pagetopic);
    return (
        <>
            <h2>{pagetopic.title}</h2>
            {pagetopic.description}
        </>
    )
}