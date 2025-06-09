// Lista completa
function Playlist() {
  const [current, setCurrent] = useState(0);
  const songs = [
    { title: "333", artist: "Matuê" },
    { title: "Crack com Mussilon", artist: "Matuê" },
    { title: "Imagina esse Cenário", artist: "Matuê, Veigh" },
    // ...continue com as outras
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Fila de reprodução</h2>
      {songs.map((song, index) => (
        <MusicItem
          key={index}
          title={song.title}
          artist={song.artist}
          isPlaying={index === current}
          onClick={() => setCurrent(index)}
        />
      ))}
    </div>
  );
}
