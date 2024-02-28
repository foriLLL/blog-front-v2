import Image from 'next/image'

export default function NotFound() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>
        <Image
          src={'/imgs/lost.svg'}
          height="500px"
          width="500px"
          alt="gitee"
          title={'404 Not Found'}
          style={{ color: 'red' }}
        />
      </h1>
    </div>
  )
}
