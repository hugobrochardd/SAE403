<?php
namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\WatchlistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: WatchlistRepository::class)]
#[ApiResource]
class Watchlist
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('json_watchlist')]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: Movie::class, inversedBy: 'watchlists')]
    #[Groups('json_watchlist')]
    private Collection $movies;

    #[ORM\OneToOne(cascade: ['persist'])]
    private ?User $user = null;

    public function __construct()
    {
        $this->movies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Movie>
     */
    public function getMovies(): Collection
    {
        return $this->movies;
    }

    public function addMovie(Movie $movie): static
    {
        if (!$this->movies->contains($movie)) {
            $this->movies->add($movie);
        }

        return $this;
    }

    public function removeMovie(Movie $movie): static
    {
        $this->movies->removeElement($movie);

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}