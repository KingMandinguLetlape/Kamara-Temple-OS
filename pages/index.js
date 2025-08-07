import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === "Gamada Amada Dagama Kamara Mandingu Yahweh Kazama") {
      alert("Login successful!");
    } else {
      alert("Invalid Code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="code"
          placeholder="Enter Divine Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type="submit">Enter Temple</Button>
      </form>
    </div>
  );
}
