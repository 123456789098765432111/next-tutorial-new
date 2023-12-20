"use client"
import React, { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Email sent successfully!');
        // Optionally reset form after successful submission
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <img src="/contact.png" alt="" className={styles.image} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            className={styles.input}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="email"
            className={styles.input}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            className={styles.textArea}
            placeholder="message"
            cols="30"
            rows="10"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <Button type="submit" url={'#'} text="Send" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
export const useClient = true;