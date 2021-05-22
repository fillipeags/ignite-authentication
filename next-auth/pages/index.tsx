import { GetServerSideProps } from 'next';
import { FormEvent, useContext, useState } from 'react';
import { parseCookies } from 'nookies';
import { AuthContext } from '../contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event : FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data);
  }

  return (
    <>
      <h1 className="logo">signIn <span>.</span></h1>
      <form onSubmit={handleSubmit} className="main-body">
        <input type="email" value={email} onChange={e => setEmail(e.target.value) } />
        <input type="password" value={password} onChange={e => setPassword(e.target.value) } />
        <button type="submit">Entrar</button>
      </form>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})