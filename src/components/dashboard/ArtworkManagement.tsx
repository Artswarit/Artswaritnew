
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Form, FormControl, FormDescription, FormField, 
  FormItem, FormLabel, FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { 
  Eye, Edit, MoreVertical, PlusCircle, 
  Trash, PinOff, Pin, Image, Audio, Video, Text 
} from "lucide-react";

// Sample artwork data
const ARTWORK_TYPES = {
  IMAGE: "image",
  AUDIO: "audio",
  VIDEO: "video",
  TEXT: "text"
};

const SAMPLE_ARTWORKS = [
  {
    id: "1",
    title: "Mystic Mountains",
    type: ARTWORK_TYPES.IMAGE,
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "A serene landscape painting of mountains at dawn",
    price: 4500,
    isPaid: true,
    visibility: "public",
    saleType: "premium",
    views: 320,
    likes: 45,
    isPinned: true,
    createdAt: "2023-05-15T10:30:00",
    publishedAt: "2023-05-18T10:30:00",
  },
  {
    id: "2",
    title: "Ambient Dreams",
    type: ARTWORK_TYPES.AUDIO,
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "Ethereal ambient soundscape with nature elements",
    price: 2200,
    isPaid: true,
    visibility: "followers",
    saleType: "public",
    views: 182,
    likes: 23,
    isPinned: false,
    createdAt: "2023-06-22T14:45:00",
    publishedAt: "2023-06-25T09:00:00",
  },
  {
    id: "3",
    title: "Urban Thoughts",
    type: ARTWORK_TYPES.TEXT,
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "A collection of poems about city life and modern alienation",
    price: 0,
    isPaid: false,
    visibility: "public",
    saleType: "free",
    views: 540,
    likes: 87,
    isPinned: true,
    createdAt: "2023-04-10T08:15:00",
    publishedAt: "2023-04-11T10:00:00",
  },
  {
    id: "4",
    title: "Dance of Colors",
    type: ARTWORK_TYPES.VIDEO,
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    description: "Abstract visualization of colors in motion",
    price: 3800,
    isPaid: true,
    visibility: "private",
    saleType: "exclusive",
    views: 0,
    likes: 0,
    isPinned: false,
    createdAt: "2023-07-05T16:20:00",
    scheduledFor: "2023-08-01T09:00:00",
  }
];

interface ArtworkManagementProps {
  isLoading: boolean;
}

const ArtworkManagement = ({ isLoading }: ArtworkManagementProps) => {
  const [artworks, setArtworks] = useState(SAMPLE_ARTWORKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedArtworkType, setSelectedArtworkType] = useState<string>(ARTWORK_TYPES.IMAGE);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      isPaid: false,
      saleType: "public",
      visibility: "public",
    },
  });

  const filteredArtworks = artworks.filter(artwork => 
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedArtworks = filteredArtworks.filter(artwork => artwork.isPinned);
  const unpinnedArtworks = filteredArtworks.filter(artwork => !artwork.isPinned);

  const togglePin = (id: string) => {
    const updatedArtworks = artworks.map(artwork => {
      if (artwork.id === id) {
        return { ...artwork, isPinned: !artwork.isPinned };
      }
      return artwork;
    });
    setArtworks(updatedArtworks);
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case ARTWORK_TYPES.IMAGE:
        return <Image className="h-4 w-4" />;
      case ARTWORK_TYPES.AUDIO:
        return <Audio className="h-4 w-4" />;
      case ARTWORK_TYPES.VIDEO:
        return <Video className="h-4 w-4" />;
      case ARTWORK_TYPES.TEXT:
        return <Text className="h-4 w-4" />;
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  const handleUpload = (data: any) => {
    console.log("Form data:", data);
    setIsUploadDialogOpen(false);
  };

  const ArtworkCard = ({ artwork }: { artwork: any }) => (
    <Card className="overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        <img
          src={artwork.thumbnail}
          alt={artwork.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {artwork.isPinned && (
            <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
              Pinned
            </span>
          )}
          <span className={`text-xs py-1 px-2 rounded-full ${
            artwork.saleType === 'free' ? 'bg-green-500 text-white' : 
            artwork.saleType === 'premium' ? 'bg-purple-500 text-white' :
            'bg-amber-500 text-white'
          }`}>
            {artwork.saleType === 'free' ? 'Free' : 
             artwork.saleType === 'premium' ? 'Premium' : 'Exclusive'}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-gray-800 text-white text-xs py-1 px-2 rounded-full flex items-center gap-1">
            {typeIcon(artwork.type)}
            {artwork.type.charAt(0).toUpperCase() + artwork.type.slice(1)}
          </span>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{artwork.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                <Eye className="h-4 w-4 mr-2" /> View
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => togglePin(artwork.id)}>
                {artwork.isPinned ? (
                  <>
                    <PinOff className="h-4 w-4 mr-2" /> Unpin
                  </>
                ) : (
                  <>
                    <Pin className="h-4 w-4 mr-2" /> Pin
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-500" onClick={() => {}}>
                <Trash className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2">{artwork.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{artwork.views}</span>
          </div>
          <div>
            {artwork.isPaid ? (
              <span className="font-medium">₹{artwork.price.toLocaleString()}</span>
            ) : (
              <span>Free</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/50 p-3 text-xs text-muted-foreground">
        <div className="flex justify-between w-full">
          <span>Created: {new Date(artwork.createdAt).toLocaleDateString()}</span>
          {artwork.publishedAt && (
            <span>Published: {new Date(artwork.publishedAt).toLocaleDateString()}</span>
          )}
          {artwork.scheduledFor && (
            <span>Scheduled: {new Date(artwork.scheduledFor).toLocaleDateString()}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Input
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={() => setIsUploadDialogOpen(true)}>
              <PlusCircle className="h-4 w-4" />
              <span>Upload New</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Upload New Artwork</DialogTitle>
              <DialogDescription>
                Choose artwork type and fill in the details
              </DialogDescription>
            </DialogHeader>
            
            <Tabs 
              defaultValue={ARTWORK_TYPES.IMAGE} 
              value={selectedArtworkType}
              onValueChange={setSelectedArtworkType}
              className="mt-4"
            >
              <TabsList className="mb-4 grid grid-cols-4 h-auto">
                <TabsTrigger value={ARTWORK_TYPES.IMAGE} className="flex flex-col py-2 h-auto">
                  <Image className="h-5 w-5 mb-1" />
                  <span>Image</span>
                </TabsTrigger>
                <TabsTrigger value={ARTWORK_TYPES.AUDIO} className="flex flex-col py-2 h-auto">
                  <Audio className="h-5 w-5 mb-1" />
                  <span>Audio</span>
                </TabsTrigger>
                <TabsTrigger value={ARTWORK_TYPES.VIDEO} className="flex flex-col py-2 h-auto">
                  <Video className="h-5 w-5 mb-1" />
                  <span>Video</span>
                </TabsTrigger>
                <TabsTrigger value={ARTWORK_TYPES.TEXT} className="flex flex-col py-2 h-auto">
                  <Text className="h-5 w-5 mb-1" />
                  <span>Text</span>
                </TabsTrigger>
              </TabsList>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-4">
                  <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="space-y-2">
                      <div className="flex justify-center">
                        {selectedArtworkType === ARTWORK_TYPES.IMAGE && <Image className="h-8 w-8 text-gray-400" />}
                        {selectedArtworkType === ARTWORK_TYPES.AUDIO && <Audio className="h-8 w-8 text-gray-400" />}
                        {selectedArtworkType === ARTWORK_TYPES.VIDEO && <Video className="h-8 w-8 text-gray-400" />}
                        {selectedArtworkType === ARTWORK_TYPES.TEXT && <Text className="h-8 w-8 text-gray-400" />}
                      </div>
                      <div className="text-sm text-gray-500">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p>or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {selectedArtworkType === ARTWORK_TYPES.IMAGE && "PNG, JPG, GIF up to 10MB"}
                        {selectedArtworkType === ARTWORK_TYPES.AUDIO && "MP3, WAV up to 20MB"}
                        {selectedArtworkType === ARTWORK_TYPES.VIDEO && "MP4, MOV up to 50MB"}
                        {selectedArtworkType === ARTWORK_TYPES.TEXT && "Write or paste text below"}
                      </p>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title of your artwork" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <textarea 
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[80px]"
                            placeholder="Describe your artwork..."
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="saleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Type</FormLabel>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            type="button"
                            variant={field.value === "free" ? "default" : "outline"}
                            onClick={() => form.setValue("saleType", "free")}
                            className="w-full"
                          >
                            Free
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === "premium" ? "default" : "outline"}
                            onClick={() => form.setValue("saleType", "premium")}
                            className="w-full"
                          >
                            Premium
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === "exclusive" ? "default" : "outline"}
                            onClick={() => form.setValue("saleType", "exclusive")}
                            className="w-full"
                          >
                            Exclusive
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("saleType") !== "free" && (
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (INR)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Price in INR" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visibility</FormLabel>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            type="button"
                            variant={field.value === "public" ? "default" : "outline"}
                            onClick={() => form.setValue("visibility", "public")}
                            className="w-full"
                          >
                            Public
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === "followers" ? "default" : "outline"}
                            onClick={() => form.setValue("visibility", "followers")}
                            className="w-full"
                          >
                            Followers
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === "private" ? "default" : "outline"}
                            onClick={() => form.setValue("visibility", "private")}
                            className="w-full"
                          >
                            Private
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Upload Artwork</Button>
                  </DialogFooter>
                </form>
              </Form>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {pinnedArtworks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Pin className="h-5 w-5" />
            Pinned Artworks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinnedArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold">All Artworks</h2>
        {unpinnedArtworks.length === 0 ? (
          <Card className="p-10 text-center">
            <p className="text-muted-foreground">No artworks found</p>
            <Button className="mt-4" onClick={() => setIsUploadDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Upload Your First Artwork
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unpinnedArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkManagement;
