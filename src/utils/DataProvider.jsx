// DataProvider.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "./useSession";
import { supabase } from "./supabaseClient";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
  const [merchant, setMerchant] = useState(null);
  const [nfcCards, setNfcCards] = useState([]);
  const [gameSettings, setGameSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const session = useSession();
  const user_id = session?.user?.id;
  const hasFetched = useRef(false);

  // Fonction pour récupérer uniquement le merchant
  const fetchMerchant = useCallback(async (merchantId) => {
    if (!merchantId) return null;
    try {
      const { data, error } = await supabase
        .from("merchant")
        .select("*")
        .eq("merchant_id", merchantId)
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Erreur lors de la récupération du merchant:", err);
      throw err;
    }
  }, []);

  // Fonction pour récupérer uniquement les cartes NFC
  const fetchNfcCards = useCallback(async (merchantId) => {
    if (!merchantId) return [];
    try {
      const { data, error } = await supabase
        .from("nfc_card")
        .select("*")
        .eq("merchant_id", merchantId);
      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Erreur lors de la récupération des cartes NFC:", err);
      throw err;
    }
  }, []);

  // Fonction pour récupérer uniquement les paramètres de jeu
  const fetchGameSettings = useCallback(async (merchantId) => {
    if (!merchantId) return [];
    try {
      const { data, error } = await supabase
        .from("game_settings")
        .select("*")
        .eq("merchant_id", merchantId)
        .maybeSingle();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Erreur lors de la récupération des cartes NFC:", err);
      throw err;
    }
  }, []);

  // Fonction pour rafraîchir uniquement le merchant
  const refetchMerchant = useCallback(async () => {
    if (!user_id) return;
    setIsLoading(true);
    try {
      const data = await fetchMerchant(user_id);
      setMerchant(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user_id, fetchMerchant]);

  // Fonction pour rafraîchir uniquement les cartes NFC
  const refetchNfcCards = useCallback(async () => {
    if (!user_id) return;
    setIsLoading(true);
    try {
      const data = await fetchNfcCards(user_id);
      setNfcCards(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user_id, fetchNfcCards]);

  //Fonction pour rafraîchir uniquement les paramètres de jeu
  const refetchGameSettings = useCallback(async () => {
    if (!user_id) return;
    setIsLoading(true);
    try {
      const data = await fetchGameSettings(user_id);
      setGameSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user_id, fetchGameSettings]);
  // Fonction pour tout rafraîchir
  const refetchAll = useCallback(async () => {
    if (!user_id) return;
    setIsLoading(true);
    try {
      const [merchantData, cardsData, gameData] = await Promise.all([
        fetchMerchant(user_id),
        fetchNfcCards(user_id),
        fetchGameSettings(user_id),
      ]);
      setMerchant(merchantData);
      setNfcCards(cardsData);
      setGameSettings(gameData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user_id, fetchMerchant, fetchNfcCards, fetchGameSettings]);

  // Chargement initial
  useEffect(() => {
    if (!user_id || hasFetched.current) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const [merchantData, cardsData, gameData] = await Promise.all([
          fetchMerchant(user_id),
          fetchNfcCards(user_id),
          fetchGameSettings(user_id),
        ]);
        setMerchant(merchantData);
        setNfcCards(cardsData);
        setGameSettings(gameData);
        hasFetched.current = true;
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user_id, fetchMerchant, fetchNfcCards, fetchGameSettings]);

  return (
    <DataContext.Provider
      value={{
        merchant,
        nfcCards,
        gameSettings,
        isLoading,
        error,
        refetchMerchant,
        refetchNfcCards,
        refetchGameSettings,
        refetchAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
