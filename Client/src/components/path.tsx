import '../css/path.css'

function Path({thoughtProcess}: {thoughtProcess: 'THOUGHTPROCESS' | 'PATH'}) {
  return <div className={`path ${thoughtProcess}`}/>  
}

export default Path;