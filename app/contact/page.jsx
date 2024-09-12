"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarked } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const info = [
  { icon: <FaPhoneAlt />, title: "Phone", description: "(61) 99924-2049" },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "douglasas410@gmail.com",
  },
  { icon: <FaMapMarked />, title: "Address", description: "Brasília, DF" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Verifica se todos os campos foram preenchidos
    for (let key in formData) {
      if (formData[key] === "") {
        return false;
      }
    }
    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Valida se todos os campos estão preenchidos
    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    emailjs
      .send(
        "service_eygj9lp",
        "template_oeqgobg",
        formData,
        "XxJFTqpoOwgnFbvEi"
      )
      .then((response) => {
        toast.success("E-mail enviado com sucesso!");
        // Limpa os campos após o envio
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
          service: "",
        });
      })
      .catch((err) => {
        toast.error("Erro ao enviar o e-mail");
      });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              onSubmit={sendEmail}
              className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
            >
              <h3 className="text-4xl text-accent">Let's work together</h3>
              <p className="text-white/60">
                Feel free to get in touch with me. I am always open to
                discussing new projects, creative ideas or opportunities to be
                part of your visions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="web-developer">
                      Web Development
                    </SelectItem>
                    <SelectItem value="frontend-developer">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="ui/ux-design">UI/UX Design</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea
                className="h-[200px]"
                placeholder="Type your message here"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              <Button size="sm" className="max-w-40" type="submit">
                Send message
              </Button>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1 max-w-full">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.description}
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;