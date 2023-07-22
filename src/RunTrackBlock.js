function RunTrackBlock({leftDistance,colory, heighty}) {

  const mystyle = {
    left: leftDistance,
    backgroundColor: colory,
    height: heighty
  };

  return (
    <div className="RunTrackBlock" style={mystyle}>

    </div>
  );
}

export default RunTrackBlock;
