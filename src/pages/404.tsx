import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <pre
        style={{
          color: 'var(--color-red)',
          fontSize: '10px',
          lineHeight: '1.1',
        }}
      >
        {`
  _  _    ___  _  _   
 | || |  / _ \\| || |  
 | || |_| | | | || |_ 
 |__   _| | | |__   _|
    | | | |_| |  | |  
    |_|  \\___/   |_|  
        `}
      </pre>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
        <span style={{ color: 'var(--color-red)' }}>error:</span> page not found
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
        <span style={{ color: 'var(--prompt-color)' }}>$</span> cd ~/home →{' '}
        <Link href="/">
          <a style={{ color: 'var(--text-accent)' }}>返回首页</a>
        </Link>
      </p>
    </div>
  )
}
