<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Movie;
use App\Entity\Category;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;



class ApiController extends AbstractController
{
    #[Route('/api', name: 'app_api')]
    public function index(): Response
    {
        return $this->render('api/index.html.twig', [
            'controller_name' => 'ApiController',
        ]);
    }

    #[Route('/api/movie/{id}', name: 'app_api_movie')]
    public function readMovie(Movie $mov, SerializerInterface $serializer ): Response
    {
      $data = $serializer->normalize($mov, null, ['groups' => 'json_movie']);
      $response = new JsonResponse( $data );
      return $response;
    }



    #[Route('/api/movies', name: 'app_api_movies')]
    public function readMovies(SerializerInterface $serializer, EntityManagerInterface $entityManager ): Response
    {
      $mov = $entityManager->getRepository(Movie::class)->findAll();
      $data = $serializer->normalize($mov, null, ['groups' => 'json_movie']);
      $response = new JsonResponse( $data );
      return $response;
    }

    
    #[Route('/api/category/{id}', name: 'app_api_category')]
    public function readcategory(category $mov, SerializerInterface $serializer ): Response
    {
      $data = $serializer->normalize($mov, null, ['groups' => 'json_category']);
      $response = new JsonResponse( $data );
      return $response;
    }
    

    #[Route('/api/categories', name: 'app_api_categories')]
    public function readcategories(SerializerInterface $serializer, EntityManagerInterface $entityManager ): Response
    {
      $mov = $entityManager->getRepository(Category::class)->findAll();
      $data = $serializer->normalize($mov, null, ['groups' => 'json_category']);
      $response = new JsonResponse( $data );
      return $response;
    }



    #[Route('/api/newmovie', name: 'app_api_newmovie')]
    public function readMoviesSortedByReleaseYear(SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
      $movies = $entityManager->getRepository(Movie::class)->findBy([], ['released' => 'DESC']);
      $data = $serializer->normalize($movies, null, ['groups' => 'json_movie']);
      $response = new JsonResponse($data);
      return $response;
    }


    #[Route('/api/highlight', name: 'app_api_highlight')]
    public function readHighlightedMovies(SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
      $movies = $entityManager->getRepository(Movie::class)->findBy(['highlight' => true]);
      $data = $serializer->normalize($movies, null, ['groups' => 'json_movie']);
      $response = new JsonResponse($data);
      return $response;
    }
}
