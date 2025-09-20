import { useState, useCallback, useEffect } from "react";
import EmojiRating from "./EmojiRating";
import ContactForm, { ContactFormData } from "./ContactForm";
import ThankYou from "./ThankYou";
import { saveFeedbackOffline, syncPendingFeedback } from "@/lib/offline-storage";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

type KioskScreen = "rating" | "contact" | "thanks";

const KioskApp = () => {
  const [currentScreen, setCurrentScreen] = useState<KioskScreen>("rating");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);

  // Auto-reset after inactivity
  const resetToStart = useCallback(() => {
    setCurrentScreen("rating");
    setSelectedRating(0);
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
  }, [inactivityTimer]);

  const startInactivityTimer = useCallback(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    // Reset after 30 seconds of inactivity on contact form
    const timer = setTimeout(() => {
      resetToStart();
    }, 30000);
    
    setInactivityTimer(timer);
  }, [inactivityTimer, resetToStart]);

  // Handle rating selection
  const handleRatingSelect = useCallback((rating: number) => {
    setSelectedRating(rating);
    setCurrentScreen("contact");
    startInactivityTimer();
  }, [startInactivityTimer]);

  // Handle form submission
  const handleFormSubmit = useCallback(async (formData: ContactFormData) => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }

    try {
      // Save to IndexedDB immediately (offline-first)
      await saveFeedbackOffline(formData);
      
      // Attempt background sync
      syncPendingFeedback();
      
      setCurrentScreen("thanks");
    } catch (error) {
      console.error("Failed to save feedback:", error);
      // Still proceed to thank you screen - data is saved locally
      setCurrentScreen("thanks");
    }
  }, [inactivityTimer]);

  // Handle skip action
  const handleSkip = useCallback(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
    resetToStart();
  }, [inactivityTimer, resetToStart]);

  // Handle completion and reset
  const handleComplete = useCallback(() => {
    resetToStart();
  }, [resetToStart]);

  // Try to sync pending feedback on app load and periodically
  useEffect(() => {
    syncPendingFeedback();
    
    const syncInterval = setInterval(() => {
      syncPendingFeedback();
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(syncInterval);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [inactivityTimer]);

  return (
    <div className="relative">
      {/* Admin Dashboard Access */}
      {currentScreen === "rating" && (
        <Link to="/dashboard" className="absolute top-4 right-4 z-10">
          <Button variant="ghost" size="sm" className="opacity-30 hover:opacity-100 transition-opacity">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </Link>
      )}
      
      {currentScreen === "rating" && (
        <EmojiRating onRatingSelect={handleRatingSelect} />
      )}
      
      {currentScreen === "contact" && (
        <ContactForm 
          rating={selectedRating}
          onSubmit={handleFormSubmit}
          onSkip={handleSkip}
        />
      )}
      
      {currentScreen === "thanks" && (
        <ThankYou onComplete={handleComplete} />
      )}
    </div>
  );
};

export default KioskApp;