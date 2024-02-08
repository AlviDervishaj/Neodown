// Components
import { View } from '@/components/View';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  // handle shortcuts
  return (
    <main className="home code">
      <Navigation />
      <View />
    </main>
  )
}
