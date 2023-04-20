import React, { useState, useEffect } from 'react'
import { FormField, Loader, Card } from '../components'

const RenderCards=({data,title})=>{
  if(data?.length>0){
      return data.map((post)=><Card key={post._id} {...post}/>)
  }

  return (<h1 className='mt-5 font bold uppercase text-xl text-[#6449ff]'>{title} </h1>)

}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('')

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://dalle-arbb.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); s



  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]' >
          The community showcase
        </h1>
        <p className='mt-2 text-[#666e75] max-w-500px' >
          browse through a collection of imaginative images by created by Dall-e-r.
        </p>
      </div>
      
      <div className='mt-2'>

        {
          ((loading) ?
            (<div className='flex justify-center items-center'>
              <Loader />
            </div>) :
            (<div>
              {
                searchText &&
                (
                  <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                    loading results for  <span className='font-bold text-[#222328] '>{searchText}</span>
                  </h2>
                )
                
              }
              <div className='grid ld:grid-cols-4 sd:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                {searchText?
                  <RenderCards data={[]} title="no item found for searched item"/>
                  :
                  <RenderCards data={allPosts} title="no post found"/>
                }
              </div>
            </div>))
        }

      </div>

    </section>
  )
}

export default Home