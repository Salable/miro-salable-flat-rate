'use client'

export const LoginButton = ({authUrl}: {authUrl: string}) => {
  // const [boardId, setBoardId] = useState<string | null>(null)
  // useEffect(() => {
  //   async function fetchData() {
  //     const board = await miro.board.getInfo()
  //   }
  //   fetchData()
  // })
  // if (!boardId) return null
  return (
    <a
      className="button button-primary"
      href={authUrl}
      target="_blank"
    >
      Login
    </a>
  );
}