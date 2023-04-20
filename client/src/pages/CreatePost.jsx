import React, { useState } from 'react'
import { getRandomPrompt } from '../utils'
import { preview } from '../assets'
import { json, useNavigate } from 'react-router-dom'
import { FormField, Loader } from '../components'


const CreatePost = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.photo && form.prompt) {

      setLoading(true);
      try {
        const response = await fetch('https://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        await response.json()
        navigate('/')
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    }
    else {
      alert('Please provide a prompt and generate an image');
    }
  }
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]' >
          Create with Dall-e-2.0
        </h1>
        <p className='mt-2 text-[#666e75] max-w-500px' >
          get through a collection of imaginative images by created by Dall-e-2 and share in the community.
        </p>
      </div>

      <form className='max-w-3xl  mt-5 mb-4' onSubmit={handleSubmit} >

        <FormField
          labelName="Your Name"
          type="text"
          name="name"
          placeholder="Ex., Saket"
          value={form.name}
          handleChange={handleChange}
        />

        <FormField
          labelName="Prompt"
          type="text"
          name="prompt"
          placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
        />
      </form>

      <div className=' relative flex items-center justify-center border-gray-300 bg-gray-50 text-gray-900 border rounded-lg w-64 h-64 focus:border-blue-500 focus:ring-blue-500'>
        {form.photo ?
          <img src={form.photo} alt={form.prompt} className='object-contain w-full h-full' />
          :
          <img src={preview} alt={form.prompt} className='object-contain w-9/12 h-9/12 opacity-30' />

        }

        {
          generatingImg &&
          (
            <div className='absolute  flex items-center justify-center z-0 inset-0 opacity-50 bg-gray-700 h-full w-full rounded-[inherit]'>
              <Loader />
            </div>
          )
        }
      </div>

      <div name="generate-button" className='mt-5'>
        <button className='text-white text-sm w-full sm:w-auto bg-green-600 px-5 py-2.5 rounded-lg' type='submit' onClick={generateImage}>
          {!generatingImg ? "Generate" : "generating..."}
        </button>
      </div>

      <div className='mt-5 max-w-3xl'>
        <h1 className='font-bold text-[#222328] text-[26px]' >
          Share your generation
        </h1>
        <p className='mt-2 text-[#666e75] ' >
          once you generate share it with the community.
        </p>
        <div name="share-button" className='mt-5'>
          <button className='text-white text-sm w-full sm:w-auto bg-[#6449ff] px-5 py-2.5 rounded-md' type='submit' onClick={generateImage}>
            share with the community
          </button>
        </div>
      </div>


    </section>
  )
}

export default CreatePost