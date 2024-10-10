import LifePhoto from './components/LifePhoto';

export default function Home() {
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">SNAP FRAME</h1>
      <LifePhoto />
    </div>
  );
}
