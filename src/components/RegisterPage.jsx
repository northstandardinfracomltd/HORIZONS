
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from '@/components/ui/use-toast';
import { createProfile } from '@/lib/supabase';

function RegisterPage({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un nom de profil",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const profile = await createProfile(username);
      
      if (!profile) {
        throw new Error('Erreur lors de la création du profil');
      }

      localStorage.setItem('currentProfileId', profile.id);
      localStorage.setItem('currentProfile', profile.username);
      
      toast({
        title: "Profil créé",
        description: "Votre profil a été créé avec succès"
      });
      
      onRegisterSuccess(profile);
    } catch (error) {
      console.error('Erreur création:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création du profil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Créer un profil
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="username">
              Nom du profil
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Choisissez un nom de profil"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer le profil"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
