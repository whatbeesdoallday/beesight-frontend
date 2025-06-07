import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/livestream", label: "Live Stream" },
    { href: "/bee-counter", label: "Bee Counter" },
    { href: "/statistics", label: "Statistics" },
    { href: "/shop", label: "Shop" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-honey-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">🐝</div>
            <span className="font-heading font-bold text-xl text-gray-800">WhatBeesDoAllDay</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-honey-600 font-semibold"
                      : "text-gray-600 hover:text-honey-600"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-honey-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-honey-200">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    isActive(item.href)
                      ? "text-honey-600 bg-honey-50 font-semibold"
                      : "text-gray-600 hover:text-honey-600 hover:bg-honey-50"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
