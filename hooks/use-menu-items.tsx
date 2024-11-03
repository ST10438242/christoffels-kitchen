import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { MenuItem } from '../model/menu-item';
import * as FileSystem from 'expo-file-system';

interface MenuItemsContextType {
  menuItems: MenuItem[];
  addedItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (dishName: string) => void;
  setAddedItems: (items: MenuItem[]) => void;
  refreshMenuItems: () => void;
}

const MenuItemsContext = createContext<MenuItemsContextType | undefined>(undefined);

const MENU_ITEMS_FILE = FileSystem.documentDirectory + 'menu-items.json';

export function MenuItemsProvider({ children }: { children: React.ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [addedItems, setAddedItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(MENU_ITEMS_FILE);
      if (fileInfo.exists) {
        const fileContents = await FileSystem.readAsStringAsync(MENU_ITEMS_FILE);
        const loadedItems = JSON.parse(fileContents);
        setMenuItems(loadedItems.map((item: any) => new MenuItem(item.dishName, item.description, item.courses, item.price)));
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
    }
  };

  const saveMenuItems = async (items: MenuItem[]) => {
    try {
      const fileContents = JSON.stringify(items);
      await FileSystem.writeAsStringAsync(MENU_ITEMS_FILE, fileContents);
    } catch (error) {
      console.error('Error saving menu items:', error);
    }
  };

  const addMenuItem = useCallback((item: MenuItem) => {
    setMenuItems((prevItems) => {
      const newItems = [...prevItems, item];
      saveMenuItems(newItems);
      return newItems;
    });
  }, []);

  const removeMenuItem = useCallback((dishName: string) => {
    setMenuItems((prevItems) => {
      const newItems = prevItems.filter(item => item.dishName !== dishName);
      saveMenuItems(newItems);
      return newItems;
    });
  }, []);

  const refreshMenuItems = useCallback(() => {
    setMenuItems((prevItems) => [...prevItems]);
  }, []);

  return (
    <MenuItemsContext.Provider value={{ menuItems, addedItems, setAddedItems, addMenuItem, removeMenuItem, refreshMenuItems }}>
      {children}
    </MenuItemsContext.Provider>
  );
}

export function useMenuItems() {
  const context = useContext(MenuItemsContext);
  if (context === undefined) {
    throw new Error('useMenuItems must be used within a MenuItemsProvider');
  }
  return context;
}
