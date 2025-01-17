import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendURl } from '../App';

export function CredentialsForm({
  connectionEstablished,
}: {
  connectionEstablished: boolean;
}) {
  const [connectionCredentials, setConnectionCredentials] = useState({
    servers: '',
    user: '',
    pass: '',
  });

  useEffect(() => {
    const credentials = localStorage.getItem('nats-credentials');
    if (credentials) {
      setConnectionCredentials(JSON.parse(credentials));
    }
  }, []);

  const handleSubmitCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    await axios.post(`${backendURl}/credentials`, {
      servers: connectionCredentials.servers,
      user: connectionCredentials.user,
      pass: connectionCredentials.pass,
    });
    localStorage.setItem(
      'nats-credentials',
      JSON.stringify(connectionCredentials)
    );
  };

  return (
    <div className='p-10 rounded-md shadow-md w-full'>
      <h2 className='text-2xl mb-5'>Credentials</h2>
      <form onSubmit={handleSubmitCredentials} className='flex flex-col gap-5'>
        <label className='flex flex-col sr-only' htmlFor='servers'>
          Server:
        </label>
        <input
          className='border rounded-md mt-1 mr-5 px-2 py-1'
          type='text'
          name='servers'
          id='servers'
          placeholder='Server: nats://XXXXXXXXX'
          value={connectionCredentials.servers}
          onChange={(e) =>
            setConnectionCredentials({
              ...connectionCredentials,
              servers: e.target.value,
            })
          }
        />
        <label className='flex flex-col sr-only' htmlFor='user'>
          {' '}
          User:
        </label>
        <input
          className='border rounded-md mt-1 mr-5 px-2 py-1'
          type='text'
          name='user'
          id='user'
          placeholder='User'
          value={connectionCredentials.user}
          onChange={(e) =>
            setConnectionCredentials({
              ...connectionCredentials,
              user: e.target.value,
            })
          }
        />
        <label className='flex flex-col sr-only' htmlFor='pass'>
          {' '}
          Password:
        </label>
        <input
          className='border rounded-md mt-1 mr-5 px-2 py-1'
          type='text'
          name='pass'
          id='pass'
          value={connectionCredentials.pass}
          placeholder='Password'
          onChange={(e) =>
            setConnectionCredentials({
              ...connectionCredentials,
              pass: e.target.value,
            })
          }
        />
        <button
          className='px-2 py-1 bg-teal-500 text-white rounded-md font-medium text-lg shadow-md hover:bg-teal-600'
          type='submit'
        >
          {connectionEstablished ? 'Change credentials' : 'Connect'}
        </button>
      </form>
    </div>
  );
}
