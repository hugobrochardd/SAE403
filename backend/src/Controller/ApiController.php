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
use Symfony\Component\HttpFoundation\Request;



class ApiController extends AbstractController
{
    #[Route('/api', name: 'app_api')]
    public function index(): Response
    {
        return $this->render('api/index.html.twig', [
            'controller_name' => 'ApiController',
        ]);
    }



    #[Route('/api/movies/{id}', name: 'app_api_movie')]
    public function readMovie(SerializerInterface $serializer, EntityManagerInterface $entityManager, int $id): Response
    {
      $movie = $entityManager->getRepository(Movie::class)->find($id);
    
      if (!$movie) {
        throw $this->createNotFoundException('The movie does not exist');
      }
    
      $data = $serializer->normalize($movie, null, ['groups' => 'json_movie']);
      $response = new JsonResponse($data);
      return $response;
    }



    #[Route('/api/movies', name: 'app_api_movies')]
    public function readMovies(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
      $page = $request->query->get('page', 1);
      $limit = $request->query->get('limit', 50);
      $offset = ($page - 1) * $limit;
    
      $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
        ->setFirstResult($offset)
        ->setMaxResults($limit)
        ->getQuery();
    
      $movies = $query->getResult();
    
      $data = $serializer->normalize($movies, null, ['groups' => 'json_movie']);
      $response = new JsonResponse($data);
      return $response;
    }


    #[Route('/api/categories', name: 'app_api_categories')]
    public function readCategories(SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
      $categories = $entityManager->getRepository(Category::class)->findAll();
    
      $data = $serializer->normalize($categories, null, ['groups' => 'json_category']);
      $response = new JsonResponse($data);
      return $response;
    }

    
    #[Route('/api/category/{category}', name: 'app_api_category')]
    public function readMoviesByCategory(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request, string $category): Response
    {
      $page = $request->query->get('page', 1);
      $limit = $request->query->get('limit', 50);
      $offset = ($page - 1) * $limit;
    
      $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
        ->join('m.category', 'c') // Join the Category entity
        ->where('c.name = :category') // Use the joined entity in the where clause
        ->setParameter('category', $category)
        ->setFirstResult($offset)
        ->setMaxResults($limit)
        ->getQuery();
    
      $movies = $query->getResult();
    
      $data = $serializer->normalize($movies, null, ['groups' => 'json_movie']);
      $response = new JsonResponse($data);
      return $response;
    }



    #[Route('/api/new', name: 'app_api_new')]
    public function readMoviesSortedByReleaseYear(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
      $page = $request->query->get('page', 1);
      $limit = $request->query->get('limit', 50);
      $offset = ($page - 1) * $limit;
    
      $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
        ->orderBy('m.released', 'DESC')
        ->setFirstResult($offset)
        ->setMaxResults($limit)
        ->getQuery();
    
      $movies = $query->getResult();
    
      $data = $serializer->normalize($movies, null, ['groups' => 'json_movie']);
      $response = new JsonResponse($data);
      return $response;
    }


    
    #[Route('/api/highlight', name: 'app_api_highlight')]
    public function highlightMovies(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
      $page = $request->query->get('page', 1);
      $limit = $request->query->get('limit', 50);
      $offset = ($page - 1) * $limit;
    
      $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
        ->where('m.highlight = :highlight')
        ->setParameter('highlight', true)
        ->setFirstResult($offset)
        ->setMaxResults($limit)
        ->getQuery();
    
      $movies = $query->getResult();
    
      $data = $serializer->normalize($movies, null, ['groups' => 'json_movie']);
      $response = new JsonResponse($data);
      return $response;
    }


    #[Route('/api/search/{term}', name: 'app_api_search')]
    public function searchMovies($term, SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
      $page = $request->query->get('page', 1);
      $limit = $request->query->get('limit', 50);
      $offset = ($page - 1) * $limit;
    
      $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
        ->where('m.name LIKE :term')
        ->setParameter('term', '%' . $term . '%')
        ->setFirstResult($offset)
        ->setMaxResults($limit)
        ->getQuery();
    
      $movies = $query->getResult();
      $data = $serializer->normalize($movies, null, ['groups' => 'json_movie']);
      $response = new JsonResponse($data);
      return $response;
    }


    #[Route('/api/random', name: 'app_api_random')]
    public function randomMovies(SerializerInterface $serializer, EntityManagerInterface $entityManager, Request $request): Response
    {
      $page = $request->query->get('page', 1);
      $limit = $request->query->get('limit', 50);
      $offset = ($page - 1) * $limit;
    
      $query = $entityManager->getRepository(Movie::class)->createQueryBuilder('m')
        ->where('m.spotlight = :spotlight')
        ->setParameter('spotlight', true)
        ->setFirstResult($offset)
        ->setMaxResults($limit)
        ->getQuery();
    
      $movies = $query->getResult();
    
      shuffle($movies);
    
      $data = $serializer->normalize($movies, null, ['groups' => 'json_movie']);
      $response = new JsonResponse($data);
      return $response;
    }
}
