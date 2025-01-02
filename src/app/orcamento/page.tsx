"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/context/shopping-cart";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/spin";
import { useRouter } from "next/navigation";
import { sendCartEmail } from "@/lib/utils/send-cart-email";
import { InputWithLabel } from "@/components/input-with-label";

export default function Page() {
  const { toast } = useToast();
  const { products, clearCart } = useShoppingCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      products,
      customer: {
        name,
        email,
      },
    };

    try {
      setIsLoad(true);
      const response = await sendCartEmail(body);
      if (response.ok) {
        toast({
          title: "E-mail enviado com sucesso!",
          description: "Você receberá o orçamento em seu e-mail.",
        });
        clearCart();
        router.push("/");
      } else {
        const error = await response.json();
        toast({
          variant: "destructive",
          title: "Erro ao enviar e-mail",
          description: error,
        });
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
    setIsLoad(false);
  }
  return (
    <div className="px-4 py-6 md:p-16">
      <div className="flex flex-col w-full max-w-[364px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Solicite seu orçamento
          </h1>
          <p className="text-sm text-gray-600">
            Você receberá o orçamento dos produtos em seu carrinho por e-mail,
            para isso, preencha os campos a seguir
          </p>
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 ">
            <InputWithLabel
              id="name"
              label="Nome"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <InputWithLabel
              id="email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-1 justify-center my-6">
            <span>Quer adicionar mais produtos?</span>
            <a
              href="/"
              className="text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              Voltar à loja
            </a>
          </div>
          <Button
            disabled={isLoad}
            type="submit"
            className={`uppercase font-semibold h-10 w-full`}
          >
            {isLoad ? <Spinner /> : "Solicitar orçamento"}
          </Button>
        </form>
      </div>
    </div>
  );
}
