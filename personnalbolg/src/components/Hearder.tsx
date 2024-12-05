import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Archive, User, PenTool, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { RootState } from '../Store';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../UserSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    await dispatch(logout());  
    navigate('/');
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl flex h-14 items-center">
        <Link to={"/"}>
          <div className="text-3xl font-bold text-blue-900">
            Personnal<span className="text-sm text-purple-600">.Blog</span>
          </div>
        </Link>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {token ? (
            // Show these options if the user is logged in
            <>
              <nav className="flex items-center space-x-6 text-sm font-medium hidden md:flex">
                <Link to="/archive" className="transition-colors hover:text-foreground/80 text-foreground/60">Archive</Link>
                <Link to="/author" className="transition-colors hover:text-foreground/80 text-foreground/60">Author</Link>
                <Link to="/create" className="transition-colors hover:text-foreground/80 text-foreground/60">Create</Link>
              </nav>
              <Button onClick={handleLogout} variant="outline" className="hidden md:flex">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            // Show these options if the user is not logged in
            <nav className="flex items-center space-x-6 text-sm font-medium hidden md:flex">
              <Link to="/login" className="transition-colors hover:text-foreground/80 text-foreground/60">Login</Link>
              <Link to="/register" className="transition-colors hover:text-foreground/80 text-foreground/60">Register</Link>
            </nav>
          )}
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {token ? (
                  // Show these options if the user is logged in
                  <>
                    <Link to="/archive" className="flex items-center text-lg font-semibold">
                      <Archive className="mr-2 h-5 w-5" />
                      Archive
                    </Link>
                    <Link to="/author" className="flex items-center text-lg font-semibold">
                      <User className="mr-2 h-5 w-5" />
                      Author
                    </Link>
                    <Link to="/create" className="flex items-center text-lg font-semibold">
                      <PenTool className="mr-2 h-5 w-5" />
                      Create
                    </Link>
                    <Button onClick={handleLogout} variant="outline" className="w-full justify-start">
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  </>
                ) : (
                  // Show these options if the user is not logged in
                  <>
                    <Link to="/login" className="flex items-center text-lg font-semibold">
                      <User className="mr-2 h-5 w-5" />
                      Login
                    </Link>
                    <Link to="/register" className="flex items-center text-lg font-semibold">
                      <PenTool className="mr-2 h-5 w-5" />
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
