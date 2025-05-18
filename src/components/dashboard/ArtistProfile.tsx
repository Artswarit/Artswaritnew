
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, Plus, X } from "lucide-react";

interface ArtistProfileProps {
  isLoading: boolean;
}

const ArtistProfile = ({ isLoading }: ArtistProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    displayName: "Ananya Sharma",
    tagName: "cosmic_canvas",
    bio: "Contemporary visual artist specializing in abstract expressionism and digital art. Exploring the intersection of tradition and technology in Indian visual storytelling.",
    profileImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    artBioTags: ["Abstract", "Digital", "Expressionism", "Contemporary"],
    artStyleTags: ["Bold colors", "Geometric", "Cultural fusion", "Minimalist"]
  });
  const [newArtBioTag, setNewArtBioTag] = useState("");
  const [newArtStyleTag, setNewArtStyleTag] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addArtBioTag = () => {
    if (newArtBioTag.trim() !== "") {
      setProfile(prev => ({
        ...prev,
        artBioTags: [...prev.artBioTags, newArtBioTag.trim()]
      }));
      setNewArtBioTag("");
    }
  };

  const removeArtBioTag = (tag: string) => {
    setProfile(prev => ({
      ...prev,
      artBioTags: prev.artBioTags.filter(t => t !== tag)
    }));
  };

  const addArtStyleTag = () => {
    if (newArtStyleTag.trim() !== "") {
      setProfile(prev => ({
        ...prev,
        artStyleTags: [...prev.artStyleTags, newArtStyleTag.trim()]
      }));
      setNewArtStyleTag("");
    }
  };

  const removeArtStyleTag = (tag: string) => {
    setProfile(prev => ({
      ...prev,
      artStyleTags: prev.artStyleTags.filter(t => t !== tag)
    }));
  };

  const saveProfile = () => {
    // In a real app, this would save to a backend
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Artist Profile</h2>
        {isEditing ? (
          <Button onClick={saveProfile} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Profile
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
              <CardDescription>Your public profile photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden border">
                <img 
                  src={profile.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Button variant="ghost" className="text-white">
                      Change
                    </Button>
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName" 
                    name="displayName" 
                    value={profile.displayName} 
                    onChange={handleChange}
                  />
                  
                  <Label htmlFor="tagName">Tag Name</Label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-1">@</span>
                    <Input 
                      id="tagName" 
                      name="tagName" 
                      value={profile.tagName} 
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              {!isEditing && (
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{profile.displayName}</h3>
                  <p className="text-muted-foreground">@{profile.tagName}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
              <CardDescription>Displayed at the top of your profile page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-40 rounded-md overflow-hidden">
                <img 
                  src={profile.coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Button variant="ghost" className="text-white">
                      Change Cover
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Artist Bio</CardTitle>
              <CardDescription>Tell others about yourself and your art</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <textarea 
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  placeholder="Write your bio here..."
                />
              ) : (
                <p className="text-sm">{profile.bio}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Art Bio Tags</CardTitle>
              <CardDescription>Categories and themes in your work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.artBioTags.map((tag) => (
                  <div 
                    key={tag} 
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>{tag}</span>
                    {isEditing && (
                      <button 
                        onClick={() => removeArtBioTag(tag)} 
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newArtBioTag}
                    onChange={(e) => setNewArtBioTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addArtBioTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addArtBioTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Art Style Tags</CardTitle>
              <CardDescription>Your artistic style and techniques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.artStyleTags.map((tag) => (
                  <div 
                    key={tag} 
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>{tag}</span>
                    {isEditing && (
                      <button 
                        onClick={() => removeArtStyleTag(tag)} 
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newArtStyleTag}
                    onChange={(e) => setNewArtStyleTag(e.target.value)}
                    placeholder="Add a style tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addArtStyleTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addArtStyleTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
