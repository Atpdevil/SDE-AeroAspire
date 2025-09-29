import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'


export default function App() {
return (
<>
<Header />
<main style={{ padding: '1rem', maxWidth: 1100, margin: '0 auto' }}>
<Home />
</main>
</>
)
}