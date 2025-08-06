import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Container } from "./components/ui/container";
import { Divider } from "./components/ui/divider";

export default function Home() {
  return (
    <Container>
      <Card>
        <h1 className="text-3xl font-bold mb-4">Welcome to Kamara Temple OS</h1>
        <p className="mb-4">Enter the divine space between heaven and code.</p>
        <Divider />
        <Input placeholder="Your sacred command..." />
        <Button className="mt-4">Invoke</Button>
      </Card>
    </Container>
  );
}
