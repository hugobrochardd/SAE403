<?php

namespace App\Entity;

use App\Repository\MovieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: MovieRepository::class)]
#[Groups(['json_movie'])]
class Movie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['json_category', 'json_watchlist'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['json_category' , 'json_watchlist'])]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'movies')]
    #[Groups(['json_category', 'json_watchlist'])]
    private Collection $category;

    #[Groups(['json_category', 'json_watchlist'])]
    #[ORM\Column(length: 255)]
    private ?string $director = null;

    #[Groups(['json_category', 'json_watchlist'])]
    #[ORM\Column(length: 255)]
    private ?string $picture = null;

    #[Groups(['json_category', 'json_watchlist'])]
    #[ORM\Column(length: 255)]
    private ?string $video = null;

    #[Groups(['json_category', 'json_watchlist'])]
    #[ORM\Column(length: 255)]
    private ?string $released = null;

    #[Groups(['json_category', 'json_watchlist'])]
    #[ORM\Column]
    private ?bool $highlight = null;

    #[Groups(['json_category', 'json_watchlist'])]
    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[Groups(['json_category', 'json_watchlist'])]
    #[ORM\Column(length: 255)]
    private ?string $une = null;

    #[Groups(['json_category', 'json_watchlist'])]
    #[ORM\Column]
    private ?bool $spotlight = null;

    #[ORM\ManyToMany(targetEntity: Watchlist::class, mappedBy: 'movie')]
    private Collection $watchlist;


    

    public function __construct()
    {
        $this->category = new ArrayCollection();
        //$this->watchlists = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategory(): Collection
    {
        return $this->category;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->category->contains($category)) {
            $this->category->add($category);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        $this->category->removeElement($category);

        return $this;
    }

    
    public function getDirector(): ?string
    {
        return $this->director;
    }

    public function setDirector(string $director): static
    {
        $this->director = $director;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture): static
    {
        $this->picture = $picture;

        return $this;
    }

    public function getVideo(): ?string
    {
        return $this->video;
    }

    public function setVideo(string $video): static
    {
        $this->video = $video;

        return $this;
    }

    public function getReleased(): ?string
    {
        return $this->released;
    }

    public function setReleased(string $released): static
    {
        $this->released = $released;

        return $this;
    }

    public function isHighlight(): ?bool
    {
        return $this->highlight;
    }

    public function setHighlight(bool $highlight): static
    {
        $this->highlight = $highlight;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getUne(): ?string
    {
        return $this->une;
    }

    public function setUne(string $une): static
    {
        $this->une = $une;

        return $this;
    }

    public function isSpotlight(): ?bool
    {
        return $this->spotlight;
    }

    public function setSpotlight(bool $spotlight): static
    {
        $this->spotlight = $spotlight;

        return $this;
    }

    public function __toString(): string
    {
        return $this->name;
    }

    /**
     * @return Collection<int, Watchlist>
     */
    public function getWatchlist(): Collection
    {
        return $this->watchlist;
    }


    
    /*
    public function addWatchlist(Watchlist $watchlist): static
    {
        if (!$this->watchlists->contains($watchlist)) {
            $this->watchlists->add($watchlist);
            $watchlist->addMovie($this);
        }

        return $this;
    }

    public function removeWatchlist(Watchlist $watchlist): static
    {
        if ($this->watchlists->removeElement($watchlist)) {
            $watchlist->removeMovie($this);
        }

        return $this;
    }
    */
}
