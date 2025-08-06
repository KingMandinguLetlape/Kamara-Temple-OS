import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Layout } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { Scroll } from "@/components/ui/scroll";
import { Section } from "@/components/ui/section";
import { Spacer } from "@/components/ui/spacer";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";

export default function Home() {
  return (
    <Layout>
      <Scroll>
        <Container>
          <Section>
            <Reveal>
              <Avatar />
              <Text>Welcome to Kamara Temple OS</Text>
              <Input placeholder="Enter divine code..." />
              <Spacer />
              <Button>Submit</Button>
              <Divider />
              <Card>
                <Text>This is the card of fire, wrapped in divine shadow.</Text>
              </Card>
            </Reveal>
          </Section>
        </Container>
      </Scroll>
    </Layout>
  );
}
